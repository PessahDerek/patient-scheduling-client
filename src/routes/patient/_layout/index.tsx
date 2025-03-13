import {createFileRoute} from '@tanstack/react-router'
import PageLayout from "../../../components/layouts/PageLayout";
import {Card, Flex, Space, Text, Title} from "@mantine/core";
import {useStore} from "zustand/react";
import appStore from "../../../stores/AppointmentStore";
import {useMemo} from "react";
import {capitalize} from "../../../libs/methods/short";

export const Route = createFileRoute('/patient/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {myApps} = useStore(appStore)

  const statColors = ['bg-primary-200', 'bg-green-100 text-secondary-800', 'bg-red-200 text-red-700', 'bg-orange-100 text-orange-700']
  const statuses = useMemo(() => {
    return ['upcoming', 'completed', 'missed', 'cancelled']
        .map(stat => ({
          status: stat,
          count: [...myApps.values()].filter(f => f.status === stat).length,
        }))
  }, [myApps])

  return (
      <PageLayout pageTitle={"Dashboard"}>
        <Space h={10}/>
        <Flex gap={5} wrap={'wrap'} className={""}>
          {...statuses.map((stat, i) =>
              <Card className={`min-w-max flex-1 ${statColors[i]}`} key={i} color={statColors[i]}>
                <Text>{capitalize(stat.status)} appointments</Text>
                <Title>{stat.count}</Title>
              </Card>)}
        </Flex>
      </PageLayout>
  )
}
