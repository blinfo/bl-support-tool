import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableMessageService {
  private IMAGE_URL = '/assets/images/undraw_no_data_qbuo (1) (3).svg';
  private messages: string[] = [
    'Här var det tomt!',
    'Men ojdå! Hittade du inte vad sökte efter?',
    'Bättre lycka nästa gång :)',
    'Nähä! Nu var det tomt igen',
    'Tomt som vanligt',
    'Sök efter rätt saker nästa gång, så ska du se att syns här ;)'
  ];

  public getEmptyMessageFromTableKey(): string {
    return (
      `
        <main class="my-32 text-center">
            <div>
                <img class="inline" src="` +
                  this.IMAGE_URL +
                `">
            </div>
            <div class="flex flex-col text-center mt-4">
              <div class="text-lg font-normal text-bl-grey-900">
                <span>` + this.randomMessage() + `</span>
              </div>
            </div>
        </main>
      `
    );
  }

  public randomMessage(): string {
    const index = Math.floor(Math.random() * Math.floor(6));
    console.log('index', index);
    return this.messages[index];
  }
}
