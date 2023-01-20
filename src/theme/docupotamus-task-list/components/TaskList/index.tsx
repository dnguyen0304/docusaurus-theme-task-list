import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const DELIMITER: string = '- [ ] ';

const StyledFormGroup = styled(FormGroup)({
    paddingLeft: '1rem',
});

// Copied from: https://github.com/facebook/docusaurus/blob/a308fb7c81832cca354192fe2984f52749441249/packages/docusaurus-theme-classic/src/theme/CodeBlock/index.tsx#L20
const stringifyChildren = (children: React.ReactNode): string => {
    const hasElement =
        React.Children
            .toArray(children)
            .some((child) => React.isValidElement(child));
    if (hasElement) {
        throw new Error(
            'rendering non-text nodes in a task list is not yet supported'
        );
    }
    return Array.isArray(children) ? children.join('') : (children as string);
};

interface Props {
    readonly children: React.ReactNode;
};

export default function TaskList(
    {
        children: rawChildren,
    }: Props,
): JSX.Element {
    const [labels, setLabels] = React.useState<string[]>([]);

    React.useEffect(() => {
        const children = stringifyChildren(rawChildren);
        setLabels(children.split(DELIMITER));
    }, []);

    return (
        <StyledFormGroup>
            {labels.map((label, i) =>
                <FormControlLabel
                    // If items are modified, update how the key is generated.
                    key={`taskItem-${i}`}
                    control={<Checkbox />}
                    label={label}
                />
            )}
        </StyledFormGroup>
    );
};
