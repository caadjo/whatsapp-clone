package com.alibou.whatsappclone.file;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor

public class FileService {

    @Value("${application.file.uploads.media-output.path}")
    private String fileUploadPath;
    public String saveFile(MultipartFile file, String senderId) {
        return null;
    }
}
