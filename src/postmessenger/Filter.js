export default class Filter {
  static getMatcher(pattern) {
    let matcher;

    if (pattern) {
      if (typeof pattern === 'object') {
        let patternLength = Object.keys(pattern).length;

        matcher = (test) => {
          if (typeof test === 'object') {
            let testLength = Object.keys(test).length;

            if (patternLength === testLength) {
              let matches = true;
              for (let key in pattern) {
                if (pattern[key] !== test[key]) {
                  matches = false;
                  break;
                }
              }

              return matches;
            } else {
              return false;
            }
          } else {
            return false;
          }
        };
      } else {
        matcher = test => pattern === test;
      }
    } else {
      matcher = test => !test;
    }

    return matcher;
  }
}
