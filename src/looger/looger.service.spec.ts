import { Test, TestingModule } from '@nestjs/testing';
import { LoogerService } from './looger.service';

describe('LoogerService', () => {
  let service: LoogerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoogerService],
    }).compile();

    service = module.get<LoogerService>(LoogerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
