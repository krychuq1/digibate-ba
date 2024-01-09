import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {HttpService} from "@nestjs/axios";
import {Company} from "../company/entities/company.entity";
const fs = require('fs')
@Injectable()
export class OpenAiService {
    public openai;
    public thread;

    constructor(private readonly httpService: HttpService) {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI, // defaults to process.env["OPENAI_API_KEY"]
        });
    }
    async createContent(company: Company, postTitle: string, postDescription: string): Promise<string> {
        await this.createThread();
        // Blog writer v1
        // const assistantId = 'asst_UEomwygd0izkSMqkH7dv3IlK';
        const assistantId = 'asst_DYXBsqh8rfLPUQfeY31cHFio';
        await this.openai.beta.threads.messages.create(this.thread.id, {
            role: "user",
            content: JSON.stringify({
                companyDetails: JSON.stringify(company),
                postTitle: postTitle,
                postDescription: postDescription
            })
        });
        const run = await this.openai.beta.threads.runs.create(this.thread.id, {
            assistant_id: assistantId,
        });
        return new Promise((resolve, reject) => {
            let isServiceCallInProgress = false;
            const intervalId = setInterval(async () => {
                let runStatus = await this.openai.beta.threads.runs.retrieve(this.thread.id, run.id);
                console.log(runStatus.status);
                if (runStatus.status === "completed") {
                    console.log('we are here completed!!');
                    let messages = await this.openai.beta.threads.messages.list(this.thread.id);
                    const content = messages.data[0].content[0].text.value;
                    try{
                        resolve(content);
                    } catch (e) {
                        reject(e);
                    }
                    isServiceCallInProgress = false;
                    clearInterval(intervalId);
                }
            }, 3000);

        });

    }
    async scanCompany(url: string) {
        await this.createThread();
        const assistantId = 'asst_LxzpcM29a2d7UKGuYMDGfsZt';
        await this.openai.beta.threads.messages.create(this.thread.id, {
            role: "user",
            content: url
        });
        const run = await this.openai.beta.threads.runs.create(this.thread.id, {
            assistant_id: assistantId,
        });
        return new Promise((resolve, reject) => {
            let isServiceCallInProgress = false;

            const intervalId = setInterval(async () => {
                let runStatus = await this.openai.beta.threads.runs.retrieve(this.thread.id, run.id);

                if (runStatus.status === 'requires_action' && !isServiceCallInProgress) {
                    isServiceCallInProgress = true;
                    const toolCall = runStatus.required_action?.submit_tool_outputs?.tool_calls[0];
                    const args = JSON.parse(toolCall.function.arguments);
                    console.log('calling research service');
                    this.scrapeCompany(args.url).subscribe({next: async (response:any) => {
                            const items = response.data;
                            fs.writeFileSync('research_ai.txt', JSON.stringify(items[0].organicResults));
                            await this.openai.beta.threads.runs.submitToolOutputs(this.thread.id, run.id, {
                                tool_outputs: [
                                    {
                                        tool_call_id: toolCall?.id,
                                        output: JSON.stringify(items[0].organicResults),
                                    },
                                ],
                            });
                        }, error: (e) =>{
                            console.log(e);
                        }
                    })
                }

                if (runStatus.status === "completed") {
                    console.log('we are here completed!!');
                    let messages = await this.openai.beta.threads.messages.list(this.thread.id);
                    const content = messages.data[0].content[0].text.value;
                    fs.writeFileSync('raw_ai.txt', content);
                    try{
                        const converted = this.__parseMarkdownJson(content);
                        resolve(converted);
                    } catch (e) {
                        reject(e);
                    }
                    isServiceCallInProgress = false;
                    clearInterval(intervalId);
                }
            }, 3000);
        });
    }

    scrapeCompany(url: string) {
        return this.httpService.post(`https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${process.env.APIFY}`, {
            queries: url,
            maxPagesPerQuery: 1,
            resultsPerPage: 5
        });

    }

    async createThread() {
        if(!this.thread) {
            this.thread = await this.openai.beta.threads.create();
        }
    }
    __parseMarkdownJson(markdownJson: string) {
        try {
            // Split the string into lines
            const lines = markdownJson.split('\n');

            // Remove the first and last lines
            lines.pop(); // Remove the last line (backticks)
            lines.shift(); // Remove the first line (backticks and 'json' keyword)
            fs.writeFileSync('raw_ai_for_json.txt', lines.join('\n').replace(/\n/g, ' '));
            // Join the remaining lines back into a single string
            return  JSON.parse(lines.join('\n').replace(/\n/g, ' '));

            // Parse the string as JSON
        } catch (error) {
            console.error("Error parsing JSON from markdown", error);
            return null;
        }
    }
}
