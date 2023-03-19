const insert = require("../inserter");

const lines = `Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7`;

describe('inserter', () => {
    it('should insert content inline', () => {
        const insertions = [
            {
                content: 'A1',
                line: 3,
                inline: true
            },
            {
                content: 'A2',
                line: 6
            }
        ]

        const result = insert(lines.split('\n'), insertions);

        expect(result).toEqual([
            'Line 1',
            'Line 2',
            'Line 3A1',
            'Line 4',
            'Line 5',
            'Line 6',
            'A2',
            'Line 7'
        ]);

    })
    it('should insert content inline when there were previous insertions', () => {
        const insertions = [
            {
                content: 'A1',
                line: 3,
                inline: true
            },
            {
                content: 'A2',
                line: 6
            },
            {
                content: 'A0',
                line: 1
            }
        ]

        const result = insert(lines.split('\n'), insertions);

        expect(result).toEqual([
            'Line 1',
            'A0',
            'Line 2',
            'Line 3A1',
            'Line 4',
            'Line 5',
            'Line 6',
            'A2',
            'Line 7'
        ]);

    })

    it('should insert new lines after', () => {
        const insertions = [
            {
                content: 'A1',
                line: 3
            },
            {
                content: 'A2',
                line: 6
            },
            {
                content: 'A0',
                line: 1
            }
        ]

        const result = insert(lines.split('\n'), insertions);

        expect(result).toEqual([
            'Line 1',
            'A0',
            'Line 2',
            'Line 3',
            'A1',
            'Line 4',
            'Line 5',
            'Line 6',
            'A2',
            'Line 7'
        ]);
    });
})