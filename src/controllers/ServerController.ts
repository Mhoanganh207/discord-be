import ServerService from "../services/ServerService";

class ServerController{


    public async createServer(req: any, res: any){
        const newServer = await ServerService.createServer(req);
        res.json(newServer);
    }
}


export default new ServerController();