import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as process from "process";

@Injectable()
export class CompanyService {
    public openai;
    public thread;
    constructor() {
        console.log(process.env.OPEN_AI)
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI, // defaults to process.env["OPENAI_API_KEY"]
        });

    }

    async createThread() {
        if(!this.thread) {
            this.thread = await this.openai.beta.threads.create();
        }

    }
    async scanWebsite(url: string) {
        await this.createThread();
        const assistantId: string = 'asst_LxzpcM29a2d7UKGuYMDGfsZt'
        const message = await this.openai.beta.threads.messages.create(
            this.thread.id,
            {
                role: "user",
                content: url
            }
        );
        const run = await this.openai.beta.threads.runs.create(
            this.thread.id,
            {
                assistant_id: assistantId,
            }
        );
        return new Promise((resolve, reject) => {
            const intervalId = setInterval(async () => {
                let runStatus = await this.openai.beta.threads.runs.retrieve(this.thread.id, run.id);
                if(runStatus.status === "completed"){
                    let messages = await this.openai.beta.threads.messages.list(this.thread.id);
                    messages.data.forEach((msg) => {
                        const content = msg.content[0].text.value;
                        resolve(content);
                    });
                    clearInterval(intervalId);
                }
            }, 3000);
        });

    }
}
