import { Injectable } from '@nestjs/common';
import { Users } from '../../domain/models/user.entity';
import { AuthRepositoryImp } from 'src/auth/domain/repositories/auth.repository';
import { RegistrationRequestDto } from './registration.dto';
import { BcryptUtils } from 'src/auth/infrastructure/external/bcrypt';

@Injectable()
export class RegistrationUseCase {
  constructor(
    private readonly userRepository: AuthRepositoryImp,
    private readonly bcryptUtils: BcryptUtils,
  ) {}

  async execute(createUserDto: RegistrationRequestDto): Promise<Users> {
    const hashedPassword = this.bcryptUtils.generateHashedPassword(
      createUserDto.password,
    );
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }
}
