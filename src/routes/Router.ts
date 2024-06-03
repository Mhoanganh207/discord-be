import serverRouter from './ServerRoute';
import profileRouter from './ProfileRoute';
import userRouter from './UserRoute';
import channelRouter from './ChannelRoute';
import { Express } from 'express';
import memberRouter from './MemberRoute';
import conversationRouter from './ConversationRoute';
import messageRouter from './MessageRoute';
import directMessageRouter from './DirectMessageRoute';
import adminRoute from './AdminRoute';


export const routerConfig = (app: Express) => {
    app.use('/api/server', serverRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/user', userRouter);
    app.use('/api/channel', channelRouter);
    app.use('/api/member', memberRouter);
    app.use('/api/conversation', conversationRouter);
    app.use('/api/messages', messageRouter);
    app.use('/api/direct-messages', directMessageRouter);
    app.use('/api/admin', adminRoute);

};

