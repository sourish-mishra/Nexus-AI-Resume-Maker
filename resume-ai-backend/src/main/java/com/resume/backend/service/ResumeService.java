package com.resume.backend.service;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;

public interface ResumeService {
    String GenerateResumeResponse(String userResumeDescription);

    Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException;
}
