import { VideoService } from '../service/video.service';
import { Response, Request } from 'express';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getIndex(res: Response): void;
    initVideo(res: Response): Promise<void>;
    getMongoVideo(req: Request, res: Response): Promise<void>;
}
