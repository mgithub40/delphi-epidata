"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Generated by CoffeeScript 2.5.1
(function () {
  /*
  A module for DELPHI's Epidata API.
   https://github.com/cmu-delphi/delphi-epidata
   Notes:
   - If running in node.js (or using browserify), there are no external
     dependencies. Otherwise, a global jQuery object named `$` must be available.
  */
  var Epidata, https, querystring; // Use built-in node.js modules unless jQuery is available

  if ((typeof $ !== "undefined" && $ !== null ? $.getJSON : void 0) == null) {
    https = require('https');
    querystring = require('querystring');
  }

  Epidata = function () {
    var BASE_URL, _list, _listitem, _request; // Because the API is stateless, the Epidata class only contains static methods


    var Epidata = /*#__PURE__*/function () {
      function Epidata() {
        _classCallCheck(this, Epidata);
      }

      _createClass(Epidata, null, [{
        key: "range",
        // Build a `range` object (ex: dates/epiweeks)
        value: function range(from, to) {
          if (to <= from) {
            var _ref = [to, from];
            from = _ref[0];
            to = _ref[1];
          }

          return {
            from: from,
            to: to
          };
        } // Fetch FluView data

      }, {
        key: "fluview",
        value: function fluview(callback, regions, epiweeks, issues, lag, auth) {
          var params; // Check parameters

          if (!(regions != null && epiweeks != null)) {
            throw {
              msg: '`regions` and `epiweeks` are both required'
            };
          }

          if (issues != null && lag != null) {
            throw {
              msg: '`issues` and `lag` are mutually exclusive'
            };
          } // Set up request


          params = {
            'source': 'fluview',
            'regions': _list(regions),
            'epiweeks': _list(epiweeks)
          };

          if (issues != null) {
            params.issues = _list(issues);
          }

          if (lag != null) {
            params.lag = lag;
          }

          if (auth != null) {
            params.auth = auth;
          } // Make the API call


          return _request(callback, params);
        } // Fetch FluView metadata

      }, {
        key: "fluview_meta",
        value: function fluview_meta(callback) {
          var params; // Set up request

          params = {
            'source': 'fluview_meta'
          }; // Make the API call

          return _request(callback, params);
        } // Fetch FluView clinical data

      }, {
        key: "fluview_clinical",
        value: function fluview_clinical(callback, regions, epiweeks, issues, lag) {
          var params; // Check parameters

          if (!(regions != null && epiweeks != null)) {
            throw {
              msg: '`regions` and `epiweeks` are both required'
            };
          }

          if (issues != null && lag != null) {
            throw {
              msg: '`issues` and `lag` are mutually exclusive'
            };
          } // Set up request


          params = {
            'source': 'fluview_clinical',
            'regions': _list(regions),
            'epiweeks': _list(epiweeks)
          };

          if (issues != null) {
            params.issues = _list(issues);
          }

          if (lag != null) {
            params.lag = lag;
          } // Make the API call


          return _request(callback, params);
        } // Fetch FluSurv data

      }, {
        key: "flusurv",
        value: function flusurv(callback, locations, epiweeks, issues, lag) {
          var params; // Check parameters

          if (!(locations != null && epiweeks != null)) {
            throw {
              msg: '`locations` and `epiweeks` are both required'
            };
          }

          if (issues != null && lag != null) {
            throw {
              msg: '`issues` and `lag` are mutually exclusive'
            };
          } // Set up request


          params = {
            'source': 'flusurv',
            'locations': _list(locations),
            'epiweeks': _list(epiweeks)
          };

          if (issues != null) {
            params.issues = _list(issues);
          }

          if (lag != null) {
            params.lag = lag;
          } // Make the API call


          return _request(callback, params);
        } // Fetch Google Flu Trends data

      }, {
        key: "gft",
        value: function gft(callback, locations, epiweeks) {
          var params; // Check parameters

          if (!(locations != null && epiweeks != null)) {
            throw {
              msg: '`locations` and `epiweeks` are both required'
            };
          } // Set up request


          params = {
            'source': 'gft',
            'locations': _list(locations),
            'epiweeks': _list(epiweeks)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch Google Health Trends data

      }, {
        key: "ght",
        value: function ght(callback, auth, locations, epiweeks, query) {
          var params; // Check parameters

          if (!(auth != null && locations != null && epiweeks != null && query != null)) {
            throw {
              msg: '`auth`, `locations`, `epiweeks`, and `query` are all required'
            };
          } // Set up request


          params = {
            'source': 'ght',
            'auth': auth,
            'locations': _list(locations),
            'epiweeks': _list(epiweeks),
            'query': query
          }; // Make the API call

          return _request(callback, params);
        } // Fetch HealthTweets data

      }, {
        key: "twitter",
        value: function twitter(callback, auth, locations, dates, epiweeks) {
          var params; // Check parameters

          if (!(auth != null && locations != null)) {
            throw {
              msg: '`auth` and `locations` are both required'
            };
          }

          if (!(dates != null ^ epiweeks != null)) {
            throw {
              msg: 'exactly one of `dates` and `epiweeks` is required'
            };
          } // Set up request


          params = {
            'source': 'twitter',
            'auth': auth,
            'locations': _list(locations)
          };

          if (dates != null) {
            params.dates = _list(dates);
          }

          if (epiweeks != null) {
            params.epiweeks = _list(epiweeks);
          } // Make the API call


          return _request(callback, params);
        } // Fetch Wikipedia access data

      }, {
        key: "wiki",
        value: function wiki(callback, articles, dates, epiweeks, hours, language) {
          var params; // Check parameters

          if (articles == null) {
            throw {
              msg: '`articles` is required'
            };
          }

          if (!(dates != null ^ epiweeks != null)) {
            throw {
              msg: 'exactly one of `dates` and `epiweeks` is required'
            };
          } // Set up request


          params = {
            'source': 'wiki',
            'articles': _list(articles),
            'language': language || 'en'
          };

          if (dates != null) {
            params.dates = _list(dates);
          }

          if (epiweeks != null) {
            params.epiweeks = _list(epiweeks);
          }

          if (hours != null) {
            params.hours = _list(hours);
          } // Make the API call


          return _request(callback, params);
        } // Fetch CDC page hits

      }, {
        key: "cdc",
        value: function cdc(callback, auth, epiweeks, locations) {
          var params; // Check parameters

          if (!(auth != null && epiweeks != null && locations != null)) {
            throw {
              msg: '`auth`, `epiweeks`, and `locations` are all required'
            };
          } // Set up request


          params = {
            'source': 'cdc',
            'auth': auth,
            'epiweeks': _list(epiweeks),
            'locations': _list(locations)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch Quidel data

      }, {
        key: "quidel",
        value: function quidel(callback, auth, epiweeks, locations) {
          var params; // Check parameters

          if (!(auth != null && epiweeks != null && locations != null)) {
            throw {
              msg: '`auth`, `epiweeks`, and `locations` are all required'
            };
          } // Set up request


          params = {
            'source': 'quidel',
            'auth': auth,
            'epiweeks': _list(epiweeks),
            'locations': _list(locations)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch NoroSTAT data (point data, no min/max)

      }, {
        key: "norostat",
        value: function norostat(callback, auth, location, epiweeks) {
          var params; // Check parameters

          if (!(auth != null && location != null && epiweeks != null)) {
            throw {
              msg: '`auth`, `location`, and `epiweeks` are all required'
            };
          } // Set up request


          params = {
            'source': 'norostat',
            'auth': auth,
            'location': location,
            'epiweeks': _list(epiweeks)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch NoroSTAT metadata

      }, {
        key: "meta_norostat",
        value: function meta_norostat(callback, auth) {
          var params; // Check parameters

          if (auth == null) {
            throw {
              msg: '`auth` is required'
            };
          } // Set up request


          params = {
            'source': 'meta_norostat',
            'auth': auth
          }; // Make the API call

          return _request(callback, params);
        } // Fetch AFHSB data (point data, no min/max)

      }, {
        key: "afhsb",
        value: function afhsb(callback, auth, locations, epiweeks, flu_types) {
          var params; // Check parameters

          if (!(auth != null && locations != null && epiweeks != null && flu_types != null)) {
            throw {
              msg: '`auth`, `locations`, `epiweeks` and `flu_types` are all required'
            };
          } // Set up request


          params = {
            'source': 'afhsb',
            'auth': auth,
            'locations': _list(locations),
            'epiweeks': _list(epiweeks),
            'flu_types': _list(flu_types)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch AFHSB metadata

      }, {
        key: "meta_afhsb",
        value: function meta_afhsb(callback, auth) {
          var params; // Check parameters

          if (auth == null) {
            throw {
              msg: '`auth` is required'
            };
          } // Set up request


          params = {
            'source': 'meta_afhsb',
            'auth': auth
          }; // Make the API call

          return _request(callback, params);
        } // Fetch NIDSS flu data

      }, {
        key: "nidss_flu",
        value: function nidss_flu(callback, regions, epiweeks, issues, lag) {
          var params; // Check parameters

          if (!(regions != null && epiweeks != null)) {
            throw {
              msg: '`regions` and `epiweeks` are both required'
            };
          }

          if (issues != null && lag != null) {
            throw {
              msg: '`issues` and `lag` are mutually exclusive'
            };
          } // Set up request


          params = {
            'source': 'nidss_flu',
            'regions': _list(regions),
            'epiweeks': _list(epiweeks)
          };

          if (issues != null) {
            params.issues = _list(issues);
          }

          if (lag != null) {
            params.lag = lag;
          } // Make the API call


          return _request(callback, params);
        } // Fetch NIDSS dengue data

      }, {
        key: "nidss_dengue",
        value: function nidss_dengue(callback, locations, epiweeks) {
          var params; // Check parameters

          if (!(locations != null && epiweeks != null)) {
            throw {
              msg: '`locations` and `epiweeks` are both required'
            };
          } // Set up request


          params = {
            'source': 'nidss_dengue',
            'locations': _list(locations),
            'epiweeks': _list(epiweeks)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch Delphi's forecast

      }, {
        key: "delphi",
        value: function delphi(callback, system, epiweek) {
          var params; // Check parameters

          if (!(system != null && epiweek != null)) {
            throw {
              msg: '`system` and `epiweek` are both required'
            };
          } // Set up request


          params = {
            'source': 'delphi',
            'system': system,
            'epiweek': epiweek
          }; // Make the API call

          return _request(callback, params);
        } // Fetch Delphi's digital surveillance sensors

      }, {
        key: "sensors",
        value: function sensors(callback, auth, names, locations, epiweeks) {
          var params; // Check parameters

          if (!(auth != null && names != null && locations != null && epiweeks != null)) {
            throw {
              msg: '`auth`, `names`, `locations`, and `epiweeks` are all required'
            };
          } // Set up request


          params = {
            'source': 'sensors',
            'auth': auth,
            'names': _list(names),
            'locations': _list(locations),
            'epiweeks': _list(epiweeks)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch Delphi's wILI nowcast

      }, {
        key: "nowcast",
        value: function nowcast(callback, locations, epiweeks) {
          var params; // Check parameters

          if (!(locations != null && epiweeks != null)) {
            throw {
              msg: '`locations` and `epiweeks` are both required'
            };
          } // Set up request


          params = {
            'source': 'nowcast',
            'locations': _list(locations),
            'epiweeks': _list(epiweeks)
          }; // Make the API call

          return _request(callback, params);
        } // Fetch API metadata

      }, {
        key: "meta",
        value: function meta(callback) {
          return _request(callback, {
            'source': 'meta'
          });
        } // Fetch Delphi's COVID-19 Surveillance Streams

      }, {
        key: "covidcast",
        value: function covidcast(callback, data_source, signals, time_type, geo_type, time_values, geo_value, as_of, issues, lag, format) {
          var params; // Check parameters

          if (!(data_source != null && signals != null && time_type != null && geo_type != null && time_values != null && geo_value != null)) {
            throw {
              msg: '`data_source`, `signals`, `time_type`, `geo_type`, `time_values`, and `geo_value` are all required'
            };
          }

          if (issues != null && lag != null) {
            throw {
              msg: '`issues` and `lag` are mutually exclusive'
            };
          } // Set up request


          params = {
            'source': 'covidcast',
            'data_source': data_source,
            'signals': signals,
            'time_type': time_type,
            'geo_type': geo_type,
            'time_values': _list(time_values)
          };

          if (Array.isArray(geo_value)) {
            params.geo_values = geo_value.join(',');
          } else {
            params.geo_value = geo_value;
          }

          if (as_of != null) {
            params.as_of = as_of;
          }

          if (issues != null) {
            params.issues = _list(issues);
          }

          if (lag != null) {
            params.lag = lag;
          }

          if (format != null) {
            params.format = format;
          } // Make the API call


          return _request(callback, params);
        } // Fetch Delphi's COVID-19 Surveillance Streams metadata

      }, {
        key: "covidcast_meta",
        value: function covidcast_meta(callback) {
          return _request(callback, {
            'source': 'covidcast_meta'
          });
        } // Fetch COVID hospitalization data

      }, {
        key: "mobility",
        value: function mobility(callback, type, country, state, month, year) {
          var params; // Check parameters

          if (!(type != null && country != null && state != null && month != null && year != null)) {
            throw {
              msg: '`type` , `country` , `state` , `month` , `year` are required'
            };
          } // Set up request


          params = {
            'source': 'mobility',
            'type' : type,
            'country' : country,
            'state' : state,
            'month' : month,
            'year' : year
          }; // Make the API call

          return _request(callback, params);
        } // Fetch API metadata

      }, {
        key: "covid_hosp",
        value: function covid_hosp(callback, states, dates, issues) {
          var params; // Check parameters

          if (!(states != null && dates != null)) {
            throw {
              msg: '`states` and `dates` are both required'
            };
          } // Set up request


          params = {
            'source': 'covid_hosp',
            'states': _list(states),
            'dates': _list(dates)
          };

          if (issues != null) {
            params.issues = _list(issues);
          } // Make the API call


          return _request(callback, params);
        } // Fetch COVID hospitalization data for specific facilities

      }, {
        key: "covid_hosp_facility",
        value: function covid_hosp_facility(callback, hospital_pks, collection_weeks, publication_dates) {
          var params; // Check parameters

          if (!(hospital_pks != null && collection_weeks != null)) {
            throw {
              msg: '`hospital_pks` and `collection_weeks` are both required'
            };
          } // Set up request


          params = {
            'source': 'covid_hosp_facility',
            'hospital_pks': _list(hospital_pks),
            'collection_weeks': _list(collection_weeks)
          };

          if (publication_dates != null) {
            params.publication_dates = _list(publication_dates);
          } // Make the API call


          return _request(callback, params);
        } // Lookup COVID hospitalization facility identifiers

      }, {
        key: "covid_hosp_facility_lookup",
        value: function covid_hosp_facility_lookup(state, ccn, city, zip, fips_code) {
          var params; // Set up request

          params = {
            'source': 'covid_hosp_facility'
          };

          if (state != null) {
            params.state = state;
          } else if (ccn != null) {
            params.ccn = ccn;
          } else if (city != null) {
            params.city = city;
          } else if (zip != null) {
            params.zip = zip;
          } else if (fips_code != null) {
            params.fips_code = fips_code;
          } else {
            throw {
              msg: 'one of `state`, `ccn`, `city`, `zip`, or `fips_code` is required'
            };
          } // Make the API call


          return _request(callback, params);
        }
      }]);

      return Epidata;
    }();

    ; // API base url

    BASE_URL = 'https://delphi.cmu.edu/epidata/api.php'; // Helper function to cast values and/or ranges to strings

    _listitem = function _listitem(value) {
      if (value.hasOwnProperty('from') && value.hasOwnProperty('to')) {
        return "".concat(value['from'], "-").concat(value['to']);
      } else {
        return "".concat(value);
      }
    }; // Helper function to build a list of values and/or ranges


    _list = function _list(values) {
      var value;

      if (!Array.isArray(values)) {
        values = [values];
      }

      return function () {
        var i, len, results;
        results = [];

        for (i = 0, len = values.length; i < len; i++) {
          value = values[i];
          results.push(_listitem(value));
        }

        return results;
      }().join(',');
    }; // Helper function to request and parse epidata


    _request = function _request(callback, params) {
      var data, fullURL, handler, isBrowser, method, reader, req; // Function to handle the API response

      handler = function handler(data) {
        if ((data != null ? data.result : void 0) != null) {
          return callback(data.result, data.message, data.epidata);
        } else {
          return callback(0, 'unknown error', null);
        }
      }; // Request data from the server


      isBrowser = (typeof $ !== "undefined" && $ !== null ? $.ajax : void 0) != null;
      data = isBrowser ? $.param(params) : querystring.stringify(params);
      fullURL = "".concat(BASE_URL, "?").concat(data); // decide method to avoid that we getting a 414 request too large error

      method = fullURL.length < 2048 ? 'GET' : 'POST';

      if (isBrowser) {
        // API call with jQuery
        return $.ajax({
          url: BASE_URL,
          dataType: "json",
          method: method,
          success: handler,
          data: params
        });
      } else {
        // Function to handle the HTTP response
        reader = function reader(response) {
          var text;
          text = '';
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
            return text += chunk;
          });
          response.on('error', function (e) {
            return error(e.message);
          });
          return response.on('end', function () {
            return handler(JSON.parse(text));
          });
        }; // API call with Node


        if (method === 'GET') {
          return https.get(fullURL, reader);
        } else {
          req = https.request(BASE_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(data)
            }
          }, reader); // Write data to request body

          req.write(data);
          return req.end();
        }
      }
    };

    return Epidata;
  }.call(this); // Export the API to the global environment


  (typeof exports !== "undefined" && exports !== null ? exports : window).Epidata = Epidata;
}).call(void 0);
