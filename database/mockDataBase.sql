insert into relialibilitycostdata(sessionId,timeInserted,reliability, cost) values (1,'2019-10-25 15:33:28', 90, 80);
insert into relialibilitycostdata(sessionId,timeInserted,reliability, cost) values (1,'2019-10-25 19:53:15', 80, 80);
insert into relialibilitycostdata(sessionId,timeInserted,reliability, cost) values (1,'2019-10-25T20:48:23.672Z', 30, 31);

insert into sessions(sessionId) values (1);

insert into vitaldata(sessionId, data) values (1, '100,100,100,100&75.033456=43.391209/69.784355=135.591342/11.371464=95.685732/70.460076=160.988591/71.818157=125.935675/57.419209');
insert into vitaldata(sessionId, data) values (1, '90,90,90,90&75.033456=44.391209/69.784355=135.591342/11.371464=95.685732/75.815158=186.188980/71.818157=125.935675/59.693501');
insert into vitaldata(sessionId, data) values (1, '80,80,80,80&75.033456=43.391209/69.784355=135.591342/11.371464=95.685732/75.815158=186.188980/77.201636=159.186578/60.764518');
insert into vitaldata(sessionId, data) values (1, '70,70,70,70&93.919678=45.390503/69.784355=135.591342/11.371464=95.685732/85.815158=196.188980/77.201636=159.186578/61.841214');
insert into vitaldata(sessionId, data) values (1, '60,60,60,60&93.919678=47.390503/75.244129=165.298937/11.371464=95.685732/85.815158=196.188980/97.201636=159.186578/65.618458');
insert into vitaldata(sessionId, data) values (1, '50,50,50,50&93.919678=43.390503/75.244129=165.298937/1.941148=90.970574/85.815158=196.188980/97.201636=159.186578/66.710413');