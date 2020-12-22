import React from 'react'
import {Card, CardBody} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'

function Chat() {
    return (
        <>
            <PageTitle>Chat</PageTitle>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Nutzername</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Large, full width sections goes here
                    </p>
                </CardBody>
            </Card>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Nutzername</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Large, full width sections goes here
                    </p>
                </CardBody>
            </Card>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Nutzername</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Large, full width sections goes here
                    </p>
                </CardBody>
            </Card>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Nutzername</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Large, full width sections goes here
                    </p>
                </CardBody>
            </Card>
        </>
    )
}

export default Chat
