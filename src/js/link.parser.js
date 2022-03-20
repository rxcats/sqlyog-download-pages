import axios from "axios";
import cheerio from "cheerio";
import _ from "underscore";

const REGEX = /([^/])+/g;
const URL_PREFIX = 'https://static.webyog.com/downloads/F798CFA0-C130-4ABB-B94A-5C4CC49CD29A';
const TARGET_PAGE = 'https://github.com/webyog/sqlyog-community/wiki/Downloads';
// const tmp = 'https://apps-rxcats.duckdns.org/sqlyog/download.html';

const linkParse = () => {
  return new Promise((resolve, reject) => {
    axios.get(TARGET_PAGE)
      .then(response => {
        const $ = cheerio.load(response.data);
        $('#wiki-body > div.markdown-body').each((i, element) => {
          const nodes = $(element).find('a');
          resolve(
            _.filter(nodes, node => {
              return node.attribs.href.includes('https')
                && node.attribs.href.includes('x64')
                && node.attribs.href.includes('exe')
            }).map(node => {
              const matched = node.attribs.href.match(REGEX);
              const filename = matched[4].replace('Community', '');
              return {
                link: `${URL_PREFIX}/${filename}`,
                filename: filename
              };
            })
          );
        });
      });
  });
}

export { linkParse };
