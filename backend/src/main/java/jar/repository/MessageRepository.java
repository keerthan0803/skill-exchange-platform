package jar.repository;

import jar.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    @Query("SELECT m FROM Message m WHERE m.chat.id = :chatId ORDER BY m.timestamp ASC")
    List<Message> findMessagesByChat(Long chatId);
    
    @Query("SELECT m FROM Message m WHERE m.chat.id = :chatId AND m.isRead = false AND m.sender.id != :userId")
    List<Message> findUnreadMessagesForUser(Long chatId, Long userId);
}
