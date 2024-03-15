
import IHiqDocument from "../interfaces/document.interface";
import HiqDocument from "../schemas/document.schema";
class DocumentRepository {

    public async getDocument(params): Promise<IHiqDocument[]> {
        if(params.isDemoSchedule){
     
            params['demoSchedule'] = { $ne: null } 
            delete params.isDemoSchedule;
          }
        const document = await HiqDocument.find(params).sort({ "timestamp": -1 });
        return document;
    }

    async getDocumentById(documentId: string): Promise<IHiqDocument> {
        const document = await HiqDocument.findById(documentId);
        return document;
    }

    public async createDocument(documents: IHiqDocument): Promise<any> {
        const options = { ordered: true };
        var docs = await HiqDocument.insertMany(documents, options);
        return docs;
    }

    public async updateDocument(document: any, documentId: any): Promise<any> {

        const updateDocument = await HiqDocument.findByIdAndUpdate(
            documentId,
            { $set: document },
            { "upsert": true }

        ).select({});
        return updateDocument;
    }

    public async deleteDocument(documentId: any): Promise<IHiqDocument | null> {
        const deleteDocument = await HiqDocument.findByIdAndDelete(documentId);
        return deleteDocument;
    }
}

export default DocumentRepository;
