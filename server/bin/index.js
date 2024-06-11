#!/usr/bin/node
import server from '../server.js';

const port = 3000;
server().listen(port, () => {
  console.log(`Server was started on '${port}'`);  // eslint-disable-line
});
