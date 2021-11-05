package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class UploadService {

  @Autowired
  private UserService userService;

  public List<String> saveFiles(List<MultipartFile> files) {
    User loggedInUser = userService.findCurrentUser();
    System.out.println(loggedInUser != null);

    List<String> uploadUrls = new ArrayList<>();

    String cwd = System.getProperty("user.dir");
    String uploadFolder = cwd + "/src/main/resources/static/uploads/";
    String generatedString = generateString();

    for (var file : files) {
    //    String fileName = Long.toString(loggedInUser.getId())+ "_" + fileNumber +".jpg";
      String fileName = generatedString + file.getOriginalFilename();
      var uploadUrl = "/uploads/" + fileName;

      File toSave = new File(uploadFolder + fileName);
      try {
        file.transferTo(toSave);
        uploadUrls.add(uploadUrl);
        System.out.println(uploadUrls);

      } catch (Exception e) {
        e.printStackTrace();
      }

    }

    return uploadUrls;
  }

  private String generateString() {
    int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'
    int targetStringLength = 10;
    Random random = new Random();

    return random.ints(leftLimit, rightLimit + 1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
  }

}
