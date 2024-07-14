import { Controller, Post, Body } from '@nestjs/common';
import * as crypto from 'crypto';
import { EmailCollectorService } from '../../services/email-collector.service';
import * as process from 'node:process';

@Controller('api/v1/email-colector')
export class EmailCollectorController {
  private key = process.env.KEY;
  private iv = process.env.IV;

  constructor(private readonly emailCollectorService: EmailCollectorService) {}

  @Post()
  async receiveEmail(@Body('email') encryptedData: string) {
    console.log(encryptedData);
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        this.key,
        this.iv,
      );
      let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      console.log(decrypted);
      //const data = JSON.parse(decrypted);
      const email = decrypted;

      // Guardar el correo electrónico en la base de datos
      await this.emailCollectorService.saveEmail(email);

      console.log(`Correo electrónico recibido: ${email}`);
      return { message: 'Correo electrónico recibido con éxito' };
    } catch (error) {
      console.error('Error desencriptando los datos:', error.message);
      throw new Error('Error desencriptando los datos');
    }
  }
}
