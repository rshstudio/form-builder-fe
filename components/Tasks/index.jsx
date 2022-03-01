import React from "react";
import classNames from "classnames";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const tasks = [
  {
    id: "1",
    title: "Name",
    type: "Text",
    options: {
      validation: {},
      placeholder: "Enter your task here",
    },
  },
  { id: "2", title: "VAT", type: "Select" },
  { id: "3", title: "Country", type: "Multi-select" },
  { id: "4", title: "Supplier", type: "Dropdown" },
  { id: "5", title: "Barcode", type: "Number" },
];

const taskStatus = {
  requested: {
    name: "Requested",
    items: tasks,
  },
  done: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Tasks(props) {
  const [columns, setColumns] = React.useState(taskStatus);

  const ListItem = ({ type, innerRef, isDragging, children, ...props }) => {
    console.log("children", children);
    return (
      <li ref={innerRef} {...props} className="mb-4 select-none min-h-8">
        <a
          href="#"
          className={classNames(
            isDragging ? "bg-gray-100" : "",
            "block bg-gray-50 hover:bg-gray-100 cursor-grab"
          )}
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {children}
              </p>
              <div className="flex flex-shrink-0 ml-2">
                <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                  {type}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  <UsersIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  position.department
                </p>
                <p className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  position.location
                </p>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                <CalendarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  Closing on
                  <time dateTime="2020-01-07">January 7, 2020</time>
                </p>
              </div>
            </div>
          </div>
        </a>
      </li>
    );
  };

  return (
    <div className="relative flex space-y-4 xl:space-y-0 xl:space-x-4">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              className="flex flex-col items-center flex-1 h-full"
              key={columnId}
            >
              <h2>{column.name}</h2>

              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <ul
                      role="list"
                      className={classNames(
                        snapshot.isDraggingOver
                          ? "bg-slate-200"
                          : "bg-slate-100",
                        "divide-y divide-gray-200 p-2 flex-1 w-full min-h-[500px]"
                      )}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <ListItem
                                  innerRef={provided.innerRef}
                                  isDragging={snapshot.isDragging}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                  type={item?.type}
                                >
                                  {item.title}
                                </ListItem>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

Tasks.propTypes = {};

export default Tasks;
