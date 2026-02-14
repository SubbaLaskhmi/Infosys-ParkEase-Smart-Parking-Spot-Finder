package com.parkease.dto;

public class GoogleLoginRequest {
    private String tokenId; 
    private String googleId;
    private String email;
    private String name;
    private String photo;
    
    public GoogleLoginRequest() {}

    public String getTokenId() { return tokenId; }
    public void setTokenId(String tokenId) { this.tokenId = tokenId; }

    public String getGoogleId() { return googleId; }
    public void setGoogleId(String googleId) { this.googleId = googleId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
}
