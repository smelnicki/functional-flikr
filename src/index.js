import _ from "lodash/fp";
import $ from "jquery";

const trace = _.curry(function (tag, x) {
    console.log(tag, JSON.stringify(x, null, 2)); // eslint-disable-line no-console
    return x;
});

const Impure = {
    getJSON: _.curry(function (callback, url) {
        $.getJSON(url, callback);
    }), 

    setHtml: _.curry(function (selector, html) {
        return $(selector).html(html);
    })
};

const url = function (term) {
    return "https://api.flickr.com/services/feeds/photos_public.gne?tags=" +
            term + "&format=json&jsoncallback=?";
};

const m = _.prop("m");
const media = _.prop("media");
const mediaUrl = _.compose(m, media);

const img = (src) => $("<img />", { src });
const itemToImg = _.compose(img, mediaUrl);
const itemsToImgs = _.map(itemToImg);

const items = _.prop("items");

const images = _.compose(itemsToImgs, items);

const renderImages = _.compose(Impure.setHtml("body"), images);

const app = _.compose(Impure.getJSON(renderImages), url);
app("cats");

