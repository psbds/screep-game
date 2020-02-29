/// <reference path="./screeps.d.ts" />

import { EventEmitter } from "events";

import RoadFlag from "./type.roadflag";

class RoadMaker {
    private ROOM_MEMORY_CLEAN_INTERVAL: number = 60;

    constructor() {

    }

    public triggerWalkedBy(creep: Creep) {
        var memoRoom = creep.room.memory;
        var roadMaker = memoRoom[`ROAD_MAKER`];
        if (!roadMaker) {
            memoRoom[`ROAD_MAKER`] = {};
        }
        var positionKey = `${creep.pos.x}=${creep.pos.y}`;

        roadMaker[positionKey] = roadMaker[positionKey] ? roadMaker[positionKey] + 1 : 1;
    }

    public roadFlag() {
        this.clearRoomMemories();
        if (Game.time % 1 == 0) {
            for (var roomId in Game.rooms) {
                var room = Game.rooms[roomId];
                room.find(FIND_FLAGS, { filter: f => f.name.startsWith("RM-") })
                    .forEach(x => x.remove());

                var memoRoom = room.memory;
                var roadMaker = memoRoom[`ROAD_MAKER`];

                var positions = Object
                    .keys(roadMaker)
                    .sort(function (a, b) {
                        return roadMaker[b] - roadMaker[a]
                    });

                var limit = 5;
                for (var position of positions) {
                    var args = position.split("=");
                    var x = parseInt(args[0]), y = parseInt(args[1])
                    if (!this.findRoads(room).some(str => str.pos.x == x && str.pos.y == y)) {
                        console.log(`Create Flag at: ${x} = ${y}`);
                        room.createFlag(x, y, "RM-" + position, COLOR_RED)
                        limit--;
                    }

                    if (limit == 0) {
                        break;
                    }
                }

            }
        }
    }

    private findRoads(room: Room): AnyStructure[] {
        var roads = room.find<FIND_STRUCTURES>(FIND_STRUCTURES, {
            filter: (object) => object.structureType === STRUCTURE_ROAD
        });

        return roads;
    }

    private clearRoomMemories() {
        if (Game.time % this.ROOM_MEMORY_CLEAN_INTERVAL == 0) {
            console.log("RoadMaker: Cleaning Memory.")
            this.getRooms().forEach(room => room.memory[`ROAD_MAKER`] = {});
        }
    }

    private getRooms(): Room[] {
        var roomArray = []
        for (var roomId in Game.rooms) {
            roomArray.push(Game.rooms[roomId]);
        }
        return roomArray;
    }
}

export default new RoadMaker();