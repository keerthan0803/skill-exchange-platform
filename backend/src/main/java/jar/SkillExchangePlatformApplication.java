package jar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"jar"})
public class SkillExchangePlatformApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkillExchangePlatformApplication.class, args);
    }
}