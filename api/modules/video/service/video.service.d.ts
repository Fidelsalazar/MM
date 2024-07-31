import { Response } from 'express';
export declare class VideoService {
    initVideo(): Promise<void>;
    streamVideo(range: string, res: Response): Promise<void>;
    private retryStream;
}
