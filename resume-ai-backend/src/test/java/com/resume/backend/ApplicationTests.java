package com.resume.backend;

import com.resume.backend.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class ApplicationTests {

    @Autowired
    private ResumeService resumeService;

    @Test
    void contextLoads() throws IOException {

        resumeService.generateResumeResponse("I am Sourish Mishra with 2 year of CPP Experience.");
    }
}
