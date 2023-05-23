import { Exclude, Expose } from 'class-transformer';

export class WordSerializer {
  _id: string;

  word: string;
  british_audio: string;
  us_audio: string;

  @Exclude()
  __v: number;

  @Expose()
  get name() {
    return this.word + ' ' + this._id;
  }
}
