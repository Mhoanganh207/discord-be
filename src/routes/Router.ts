import serverRouter from './ServerRoute';
import profileRouter from './ProfileRoute';
import userRouter from './UserRoute';
import channelRouter from './ChannelRoute';
import { Router, Express } from 'express';
import memberRouter from './MemberRoute';

export const routerConfig = (app: Express) => {
    app.use('/api/server', serverRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/user', userRouter);
    app.use('/api/channel', channelRouter);
    app.use('/api/member', memberRouter);
};

