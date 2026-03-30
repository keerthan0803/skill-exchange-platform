package jar.service;

import jar.dto.ChatListDto;
import jar.dto.MessageDto;
import jar.model.Chat;
import jar.model.Message;
import jar.model.User;
import jar.repository.ChatRepository;
import jar.repository.MessageRepository;
import jar.repository.UserRepository;
import jar.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    
    @Autowired
    private ChatRepository chatRepository;
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public Long getCurrentUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing Authorization header");
        }
        
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return user.getId();
    }
    
    public List<ChatListDto> getUserChats(String authHeader) {
        Long userId = getCurrentUserId(authHeader);
        List<Chat> chats = chatRepository.findChatsByUserId(userId);
        
        return chats.stream()
                .map(chat -> convertToChatListDto(chat, userId))
                .collect(Collectors.toList());
    }
    
    public List<MessageDto> getMessagesForChat(Long chatId, String authHeader) {
        Long userId = getCurrentUserId(authHeader);
        
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));
        
        // Verify user is part of this chat
        if (!chat.getUser1().getId().equals(userId) && !chat.getUser2().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to this chat");
        }
        
        List<Message> messages = messageRepository.findMessagesByChat(chatId);
        
        // Mark unread messages as read
        List<Message> unreadMessages = messageRepository.findUnreadMessagesForUser(chatId, userId);
        for (Message message : unreadMessages) {
            message.setIsRead(true);
            messageRepository.save(message);
        }
        
        return messages.stream()
                .map(msg -> new MessageDto(
                        msg.getId(),
                        msg.getChat().getId(),
                        msg.getSender().getId(),
                        msg.getSender().getUsername(),
                        msg.getContent(),
                        msg.getTimestamp(),
                        msg.getIsRead()
                ))
                .collect(Collectors.toList());
    }
    
    public MessageDto sendMessage(Long recipientId, String content, String authHeader) {
        Long senderId = getCurrentUserId(authHeader);
        
        if (senderId.equals(recipientId)) {
            throw new RuntimeException("Cannot send message to yourself");
        }
        
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        
        // Find or create chat
        Chat chat = chatRepository.findChatBetweenUsers(senderId, recipientId)
                .orElseGet(() -> {
                    Chat newChat = new Chat(sender, recipient);
                    return chatRepository.save(newChat);
                });
        
        // Create message
        Message message = new Message(chat, sender, content);
        message = messageRepository.save(message);
        
        // Update chat's last message time
        chat.setLastMessageTime(message.getTimestamp());
        chatRepository.save(chat);
        
        return new MessageDto(
                message.getId(),
                message.getChat().getId(),
                message.getSender().getId(),
                message.getSender().getUsername(),
                message.getContent(),
                message.getTimestamp(),
                message.getIsRead()
        );
    }
    
    public Chat startChat(Long otherUserId, String authHeader) {
        Long userId = getCurrentUserId(authHeader);
        
        if (userId.equals(otherUserId)) {
            throw new RuntimeException("Cannot start chat with yourself");
        }
        
        User user1 = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        User user2 = userRepository.findById(otherUserId)
                .orElseThrow(() -> new RuntimeException("Other user not found"));
        
        // Find or create chat
        return chatRepository.findChatBetweenUsers(userId, otherUserId)
                .orElseGet(() -> {
                    Chat newChat = new Chat(user1, user2);
                    return chatRepository.save(newChat);
                });
    }

    public ChatListDto startChatAndGetDto(Long otherUserId, String authHeader) {
        Long userId = getCurrentUserId(authHeader);
        Chat chat = startChat(otherUserId, authHeader);
        return convertToChatListDto(chat, userId);
    }
    
    private ChatListDto convertToChatListDto(Chat chat, Long userId) {
        User otherUser = chat.getUser1().getId().equals(userId) ? chat.getUser2() : chat.getUser1();
        
        List<Message> messages = messageRepository.findMessagesByChat(chat.getId());
        String lastMessage = "";
        if (!messages.isEmpty()) {
            lastMessage = messages.get(messages.size() - 1).getContent();
            if (lastMessage.length() > 50) {
                lastMessage = lastMessage.substring(0, 50) + "...";
            }
        }
        
        List<Message> unreadMessages = messageRepository.findUnreadMessagesForUser(chat.getId(), userId);
        
        return new ChatListDto(
                chat.getId(),
                otherUser.getId(),
                otherUser.getUsername(),
                null,
                otherUser.getBio(),
                lastMessage,
                chat.getLastMessageTime(),
                unreadMessages.size()
        );
    }
}
