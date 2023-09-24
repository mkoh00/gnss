const QUERIES = {
  GET_SKY_PLOT_DATA: "SELECT time_stamp, sat_type, sat_id, azimuth, elevation, resp FROM gnss.satobs WHERE mount_point=",
  GET_SATOBS_DATA: "SELECT * FROM gnss.satobs",
  GET_SNR_DATA: "SELECT * FROM gnss.snr",
  GET_MOUNT_POINTS: "SELECT distinct mount_point FROM gnss.satobs"
};

module.exports = QUERIES;
