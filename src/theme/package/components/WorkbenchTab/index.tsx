import { useLocation } from '@docusaurus/router';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTasks } from '../../contexts/tasks';
import List from '../TaskList/List';

const Layout = styled(Box)({
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    padding: 'var(--d9s-space-m)',
});

export default function WorkbenchTab(): JSX.Element {
    const location = useLocation();
    const { tasks } = useTasks();

    return (
        <Layout>
            {Array
                .from(tasks.get(location.pathname)?.keys() ?? [])
                .map(taskListId => {
                    return (
                        <List
                            path={location.pathname}
                            taskListId={taskListId}
                        />
                    );
                })
            }
        </Layout>
    );
};
