const channels = {
  unknown: "unknown"
};

const configure = async api => {
  api.on("connection", connection => {
    api.channel(channels.unknown).join(connection);
  });

  api.publish((data, context) => api.channel(channels.unknown));

  api.on("disconnect", connection => {
    api.channel(channels.unknown).leave(connection);
  });
};

module.exports = {
  configure,
  channels
};
