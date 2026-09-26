const express=require("express");
const documentRouter= express.Router();
const {uploadDocument,getUserDocuments,getDocumentById,deleteDocument}=require('../controllers/documentController');
const upload=require('../middleware/uploadMiddleware');
const verifyToken=require('../middleware/authMiddleware');

documentRouter.use(verifyToken);

documentRouter.post('/api/documents/upload',upload.single("document"),uploadDocument);
documentRouter.get('/api/documents/user/:id',getUserDocuments);
documentRouter.get('/api/documents/:id',getDocumentById)
documentRouter.delete('/api/documents/:id',deleteDocument)

module.exports=documentRouter;