export const ajouterFonctionEscape = (OnClose: () => void) => {
    const listener = (event: KeyboardEvent) => {
        if (event.key == "Escape")
            OnClose();
    }
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
} 
