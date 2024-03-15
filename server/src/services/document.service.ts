import DocumentRepository from "../repositories/document.repository";

class DocumentService {
  private documentRepository: DocumentRepository;

  constructor() {
    this.documentRepository = new DocumentRepository();
  }

  public async getDocument(params?) {
    const getDocument = await this.documentRepository.getDocument(params);
    return getDocument;
  }

  public async getDocumentById(documentId: string): Promise<any> {
    const getDocument = await this.documentRepository.getDocumentById(documentId);
    return getDocument;
  }

  public async createDocument(document: any): Promise<any> {
    const savedDocument = await this.documentRepository.createDocument(document);
    return savedDocument
  }

  public async updateDocument(document: any, documentId: any): Promise<any> {
    const updateDocument = await this.documentRepository.updateDocument(document, documentId);
    return updateDocument;
  }

  public async deleteDocument(documentId: any): Promise<any> {
    const deleteDocument = await this.documentRepository.deleteDocument(documentId);
    return deleteDocument;
  }

}

export default DocumentService;