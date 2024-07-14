import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from '../schemas/email.schema';

@Injectable()
export class EmailCollectorService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
  ) {}

  async saveEmail(email: string): Promise<Email> {
    const createdEmail = new this.emailModel({ email });
    return createdEmail.save();
  }
}
