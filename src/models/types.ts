import { Server as NetServer, Socket } from 'net';
import { Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { Server, Member, Profile } from '@prisma/client';

export type ServerWithMembers = Server & {
    members: (Member & { profile: Profile })[]
};

