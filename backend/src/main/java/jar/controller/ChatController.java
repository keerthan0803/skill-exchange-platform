package jar.controller;

import jar.dto.ChatListDto;
import jar.dto.MessageDto;
import jar.dto.SendMessageRequest;
import jar.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "${FRONTEND_URL:https://keerthan-23eg106b48.vercel.app}")
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @GetMapping
    public ResponseEntity<?> getUserChats(@RequestHeader("Authorization") String authHeader) {
        try {
            List<ChatListDto> chats = chatService.getUserChats(authHeader);
            return ResponseEntity.ok(chats);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> startChat(
            @RequestParam Long otherUserId,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            ChatListDto chat = chatService.startChatAndGetDto(otherUserId, authHeader);
            return ResponseEntity.status(HttpStatus.CREATED).body(chat);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping("/{chatId}/messages")
    public ResponseEntity<?> getMessages(
            @PathVariable Long chatId,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            List<MessageDto> messages = chatService.getMessagesForChat(chatId, authHeader);
            return ResponseEntity.ok(messages);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(
            @RequestBody SendMessageRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            if (request.getRecipientId() == null || request.getContent() == null || request.getContent().isBlank()) {
                throw new RuntimeException("Recipient ID and message content are required");
            }
            
            MessageDto message = chatService.sendMessage(request.getRecipientId(), request.getContent(), authHeader);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
