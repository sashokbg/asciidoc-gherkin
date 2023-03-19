import {Insertion} from "./plugin";

const insert = function(lines: string[], insertions: Insertion[]) {

    insertions.sort((a, b) => {
        if(a.line < b.line) {
            return -1;
        } else if(a.line > b.line) {
            return  1;
        } else {
            return 0;
        }
    });

    let indexOffset = 0;

    for(let insertion of insertions) {
        if(insertion.inline) {
           lines[insertion.line + indexOffset -1] += insertion.content;
        } else {
            lines.splice(insertion.line + indexOffset, 0, insertion.content);
            indexOffset ++;
        }
    }

    return lines;
}

module.exports = insert;