# Backend Gallery System Implementation Prompt

## Objective
Create a complete gallery management system with database storage for images and videos, replacing hardcoded frontend assets. The frontend currently displays gallery items from imported image files - we need to migrate this to a database-driven system with file upload capabilities.

## Database Schema

### Create `gallery` table with the following structure:

```sql
CREATE TABLE gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    type ENUM('image', 'video') NOT NULL DEFAULT 'image',
    file_url VARCHAR(500) NOT NULL COMMENT 'URL to uploaded file',
    thumbnail_url VARCHAR(500) COMMENT 'Thumbnail for videos or optimized image',
    file_size BIGINT COMMENT 'File size in bytes',
    mime_type VARCHAR(100) COMMENT 'e.g., image/jpeg, video/mp4',
    display_order INT DEFAULT 0 COMMENT 'For custom ordering',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_active (is_active),
    INDEX idx_display_order (display_order)
);
```

## API Endpoints Required

### Base URL: `https://kigalirabbitend.onrender.com/api/gallery`

### 1. GET `/api/gallery` - List all gallery items
**Query Parameters:**
- `type` (optional): Filter by 'image' or 'video'
- `active_only` (optional): Boolean, default true - only return active items
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page, default 50

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Rabbit Farm Image 1",
      "alt_text": "Gallery image 1",
      "type": "image",
      "file_url": "https://kigalirabbitend.onrender.com/uploads/gallery/image-123.jpg",
      "thumbnail_url": "https://kigalirabbitend.onrender.com/uploads/gallery/thumb-image-123.jpg",
      "file_size": 245678,
      "mime_type": "image/jpeg",
      "display_order": 1,
      "is_active": true,
      "created_at": "2025-01-15T10:30:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "title": "Farm Video Tour",
      "alt_text": "Rabbit Farm Video",
      "type": "video",
      "file_url": "https://kigalirabbitend.onrender.com/uploads/gallery/video-456.mp4",
      "thumbnail_url": "https://kigalirabbitend.onrender.com/uploads/gallery/thumb-video-456.jpg",
      "file_size": 5245678,
      "mime_type": "video/mp4",
      "display_order": 2,
      "is_active": true,
      "created_at": "2025-01-15T11:00:00Z",
      "updated_at": "2025-01-15T11:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 50
}
```

### 2. GET `/api/gallery/:id` - Get single gallery item
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Rabbit Farm Image 1",
    "alt_text": "Gallery image 1",
    "type": "image",
    "file_url": "https://kigalirabbitend.onrender.com/uploads/gallery/image-123.jpg",
    "thumbnail_url": "https://kigalirabbitend.onrender.com/uploads/gallery/thumb-image-123.jpg",
    "file_size": 245678,
    "mime_type": "image/jpeg",
    "display_order": 1,
    "is_active": true,
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
}
```

### 3. POST `/api/gallery` - Upload new gallery item
**Request:** Multipart form data
- `file` (required): The image or video file
- `title` (optional): Title for the item
- `alt_text` (optional): Alt text for accessibility
- `type` (optional): 'image' or 'video' - auto-detect if not provided
- `display_order` (optional): Integer for ordering

**Response:**
```json
{
  "success": true,
  "message": "Gallery item uploaded successfully",
  "data": {
    "id": 3,
    "title": "New Gallery Image",
    "alt_text": "New Gallery image",
    "type": "image",
    "file_url": "https://kigalirabbitend.onrender.com/uploads/gallery/image-789.jpg",
    "thumbnail_url": "https://kigalirabbitend.onrender.com/uploads/gallery/thumb-image-789.jpg",
    "file_size": 189234,
    "mime_type": "image/jpeg",
    "display_order": 3,
    "is_active": true,
    "created_at": "2025-01-15T12:00:00Z",
    "updated_at": "2025-01-15T12:00:00Z"
  }
}
```

### 4. PATCH `/api/gallery/:id` - Update gallery item metadata
**Request Body (JSON):**
```json
{
  "title": "Updated Title",
  "alt_text": "Updated alt text",
  "display_order": 5,
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gallery item updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "alt_text": "Updated alt text",
    "type": "image",
    "file_url": "https://kigalirabbitend.onrender.com/uploads/gallery/image-123.jpg",
    "thumbnail_url": "https://kigalirabbitend.onrender.com/uploads/gallery/thumb-image-123.jpg",
    "file_size": 245678,
    "mime_type": "image/jpeg",
    "display_order": 5,
    "is_active": true,
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T12:30:00Z"
  }
}
```

### 5. DELETE `/api/gallery/:id` - Delete gallery item
**Response:**
```json
{
  "success": true,
  "message": "Gallery item deleted successfully"
}
```

### 6. POST `/api/gallery/reorder` - Update display order (bulk)
**Request Body:**
```json
{
  "items": [
    { "id": 1, "display_order": 3 },
    { "id": 2, "display_order": 1 },
    { "id": 3, "display_order": 2 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Display order updated successfully"
}
```

## File Upload Requirements

### File Storage:
- Store uploaded files in `/uploads/gallery/` directory (or cloud storage like AWS S3, Cloudinary)
- Generate unique filenames: `{type}-{timestamp}-{random}.{ext}`
- For images: Create thumbnails in `/uploads/gallery/thumb-{filename}`
- For videos: Extract/generate thumbnail frames

### Supported File Types:
**Images:**
- JPEG, JPG
- PNG
- WebP
- GIF

**Videos:**
- MP4
- WebM
- MOV

### File Size Limits:
- Images: Max 10MB
- Videos: Max 100MB

### Validation:
- Validate file type by MIME type and extension
- Validate file size
- For images: Optional image optimization/resizing
- For videos: Optional compression/transcoding

## Error Responses

All endpoints should return consistent error format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

**HTTP Status Codes:**
- 200: Success
- 201: Created (for POST)
- 400: Bad Request (validation errors)
- 404: Not Found
- 413: Payload Too Large (file too big)
- 415: Unsupported Media Type (invalid file type)
- 500: Internal Server Error

## Authentication (if needed)

If these endpoints require authentication:
- Add JWT token validation middleware
- Include `Authorization: Bearer <token>` header requirement
- Return 401 Unauthorized if token is missing/invalid

## Implementation Notes

1. **File Upload Handling:**
   - Use a library like `multer` (Node.js) or equivalent for your backend framework
   - Validate files before saving
   - Generate thumbnails for images automatically
   - Extract video thumbnails (first frame or custom frame)

2. **Database:**
   - Use transactions for operations that modify multiple records
   - Add proper indexes for performance
   - Soft delete option (is_active = false) instead of hard delete

3. **Performance:**
   - Implement pagination for large galleries
   - Use CDN or optimized file serving
   - Cache frequently accessed items

4. **Security:**
   - Sanitize file names
   - Validate file contents (not just extension)
   - Prevent path traversal attacks
   - Rate limiting on upload endpoints

## Frontend Integration

The frontend will call:
- `GET /api/gallery?type=image` for images
- `GET /api/gallery?type=video` for videos
- `GET /api/gallery` for all items

Frontend expects response format matching the examples above.

## Testing Checklist

- [ ] Upload image file successfully
- [ ] Upload video file successfully
- [ ] List all gallery items
- [ ] Filter by type (image/video)
- [ ] Get single item by ID
- [ ] Update item metadata
- [ ] Delete item (and associated files)
- [ ] Reorder items
- [ ] Handle invalid file types
- [ ] Handle oversized files
- [ ] Generate thumbnails correctly
- [ ] Pagination works correctly

## Migration Notes

Once this is implemented, the frontend will:
1. Remove hardcoded image imports
2. Fetch gallery items from `/api/gallery` endpoint
3. Display images/videos from database URLs
4. Allow admin to upload/manage gallery through dashboard

