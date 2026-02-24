import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/ReduxStore";
import { setDisplayLibaryCard } from "../../redux/slices/ModalSlice";
import libraryCard from "../../assets/librarycard.png";
import React from "react";

export const LibraryCard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleDisplayModal = () => {
        dispatch(setDisplayLibaryCard(true));
    };

    return (
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center border border-blue-200">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                    Get A Library Card
                </h2>

                <div className="flex justify-center mb-6">
                    <img
                        src={libraryCard}
                        alt="library card"
                        className="w-full max-w-xs h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                    Learn how to get your own library card{" "}
                    <span
                        onClick={handleDisplayModal}
                        className="text-blue-700 font-semibold hover:underline cursor-pointer"
                    >
                        here.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LibraryCard;