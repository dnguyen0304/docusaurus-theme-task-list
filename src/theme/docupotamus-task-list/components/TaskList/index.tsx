import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const DELIMITER: string = '- [ ] ';

type onChange = (event: React.SyntheticEvent, checked: boolean) => void;

const StyledFormGroup = styled(FormGroup)({
    marginBottom: 'var(--ifm-leading)',
    paddingLeft: '1rem',
});

interface StyledFormControlLabelProps {
    readonly checked: boolean;
};

const StyledFormControlLabel = styled(FormControlLabel)<
    StyledFormControlLabelProps
>(({ checked }) => ({
    borderRadius: '0.5rem',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    '&:hover': {
        backgroundColor: 'var(--ifm-hover-overlay)',
        color: 'var(--ifm-color-primary)',
        transition:
            `color `
            + `var(--ifm-transition-fast) `
            + `var(--ifm-transition-timing-default)`,
    },
    '& .MuiFormControlLabel-label': {
        textDecorationLine: checked ? 'line-through' : 'none',
    },
}));

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
    const [isChecked, setIsCheckeds] = React.useState<boolean[]>([]);

    const createHandleChange = (i: number): onChange => {
        return (() => setIsCheckeds(prev => {
            if (i >= prev.length) {
                throw new Error('index out of bounds');
            }
            const copied = [...prev];
            copied[i] = !copied[i];
            return copied;
        }));
    };

    React.useEffect(() => {
        const children = stringifyChildren(rawChildren);
        const newLabels = children.split(DELIMITER);
        setLabels(newLabels);
        setIsCheckeds(Array(newLabels.length).fill(false));
    }, []);

    return (
        <StyledFormGroup>
            {labels.map((label, i) =>
                <StyledFormControlLabel
                    // If items are modified, update how the key is generated.
                    key={`taskItem-${i}`}
                    checked={isChecked[i]}
                    control={<Checkbox />}
                    label={label}
                    onChange={createHandleChange(i)}
                />
            )}
        </StyledFormGroup>
    );
};
