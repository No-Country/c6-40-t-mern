import { Disclosure } from "@headlessui/react";

export const MobileButton = () => {
    return (
        <div>
            <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU"  // src={user.picture}
                            alt="photo" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                            Fulanito Rodriguez
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                            Correo@prueba.com
                        </div>
                    </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                        Tu perfil
                    </Disclosure.Button>
                    <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                        Ajustes
                    </Disclosure.Button>
                    <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                        Cerrar sesion 
                    </Disclosure.Button>
                </div>
            </div>
        </div>
    )
}