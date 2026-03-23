package jar.controller;

import jar.dto.CreateSkillRequestDto;
import jar.dto.SkillRequestResponseDto;
import jar.dto.UpdateSkillRequestStatusDto;
import jar.service.SkillRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "${FRONTEND_URL:https://keerthan-23eg106b48.vercel.app}")
public class SkillRequestController {

    @Autowired
    private SkillRequestService skillRequestService;

    @PostMapping
    public ResponseEntity<?> createRequest(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CreateSkillRequestDto requestDto
    ) {
        try {
            SkillRequestResponseDto response = skillRequestService.createRequest(authHeader, requestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/sent")
    public ResponseEntity<?> getSentRequests(@RequestHeader("Authorization") String authHeader) {
        try {
            List<SkillRequestResponseDto> response = skillRequestService.getSentRequests(authHeader);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/received")
    public ResponseEntity<?> getReceivedRequests(@RequestHeader("Authorization") String authHeader) {
        try {
            List<SkillRequestResponseDto> response = skillRequestService.getReceivedRequests(authHeader);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<?> updateStatus(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long requestId,
            @RequestBody UpdateSkillRequestStatusDto statusDto
    ) {
        try {
            SkillRequestResponseDto response = skillRequestService.updateStatus(authHeader, requestId, statusDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
