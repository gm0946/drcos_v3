(function() {
  if (location.protocol !== "https:") {
    const httpsURL = "https://" + location.hostname + location.pathname + location.search + location.hash;
    location.replace(httpsURL);
  }
})();