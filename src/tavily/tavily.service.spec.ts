import { Test, TestingModule } from '@nestjs/testing';
import { TavilyService } from './tavily.service';

describe('TavilyService', () => {
  let service: TavilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TavilyService],
    }).compile();

    service = module.get<TavilyService>(TavilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
