import { SceneContext } from 'telegraf/typings/scenes';

type ExtendedSession = {
  session: {
    firstLoggedDate: Date;
    log: { date: string; count: number }[];
    lastLoggedDate: Date;
    lang: string;
  };
};

export type SessionContext = SceneContext & ExtendedSession;
