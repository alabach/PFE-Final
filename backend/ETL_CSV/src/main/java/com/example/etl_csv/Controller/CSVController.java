package com.example.etl_csv.Controller;

import com.example.etl_csv.Model.ResponseMessage;
import com.example.etl_csv.Service.CSVHelper;
import com.example.etl_csv.Service.CsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/etl")
@RequiredArgsConstructor
public class CSVController {



    @Autowired
    CsvService fileService;

    @PostMapping("/upload-data")
    public ResponseEntity<ResponseMessage> uploadFile1(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                fileService.save(file);

                fileService.save2(file);


                message = "Uploaded the file successfully: " + file.getOriginalFilename();

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/api/auth/download/")
                        .path(file.getOriginalFilename())
                        .toUriString();

                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message,fileDownloadUri));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message,""));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message,""));
    }













    //  @GetMapping("/tutorials")
    //  public ResponseEntity<List<Proc>> getAllTutorials() {
//	    try {
//	      List<Proc> tutorials = fileService.getAllTutorials();
    //
//	      if (tutorials.isEmpty()) {
//	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//	      }
    //
//	      return new ResponseEntity<>(tutorials, HttpStatus.OK);
//	    } catch (Exception e) {
//	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
    //  }
    //
    //  @GetMapping("/download/{fileName:.+}")
    //  public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
//	    InputStreamResource file = new InputStreamResource(fileService.load());
    //
//	    return ResponseEntity.ok()
//	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
//	        .contentType(MediaType.parseMediaType("application/csv"))
//	        .body(file);
    //  }
    //

}
