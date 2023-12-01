import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import * as process from "process";

@Injectable()
export class TavilyService {
    constructor(private readonly httpService: HttpService) {
    }
    test() {
        console.log('testing app');
    }
   scanCompany(url: string) {
        const body = {
            api_key: process.env.TAVILY_AI,
            query: `make research on a company (URL: ${url})`,
            search_depth: "advanced",
            include_answer: false,
            include_images: false,
            include_raw_content: false,
            max_results: 5,
            include_domains: [],
        }
       console.log(body);
        return this.httpService.post(process.env.TAVILY_BASE_URL + 'search', body);
    }

}
