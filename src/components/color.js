function ratingcolor(score) {
  if (100 < score || score > 91) {
    return "#00FF00";
  } else if (90 < score || score > 81) {
    return "#93C47D";
  } else if (80 < score || score > 71) {
    return "#B6D7A8";
  } else if (70 < score || score > 61) {
    return "#FFFF00";
  } else if (60 < score || score > 51) {
    return "#FFD966";
  } else if (50 < score || score > 41) {
    return "#FFE599";
  }
}

function songcolor(score) {
  if (10 == score) {
    return "#6766ff";
  } else if (9.9 < score && score > 9.0) {
    return "#00ffa3";
  } else if (8.9 < score && score > 8.0) {
    return "#669934";
  } else if (7.9 < score && score > 7.0) {
    return "#f5ff00";
  } else if (6.9 < score && score > 6.0) {
    return "#ffa800";
  } else if (5.9 < score && score > 5.0) {
    return "#ff6100";
  } else if (4.9 < score && score > 4.0) {
    return "#fe0000";
  } else if (3.9 < score && score > 3.0) {
    return "#ff00fe";
  } else if (2.9 < score && score > 2.0) {
    return "#c100ff";
  } else if (1.9 < score && score > 1.0) {
    return "#640070";
  } else if (0.9 < score && score > 0.0) {
    return "#ffffff";
  } else {
    return "#ffffff";
  }
}

export { ratingcolor, songcolor };