import cv2
from pyzbar.pyzbar import decode

def scan_barcode():
    cap = cv2.VideoCapture(0)  # Open the camera
    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Failed to capture frame")
            break

        decoded_objects = decode(frame)
        for obj in decoded_objects:
            barcode_number = obj.data.decode("utf-8").strip()  # Trim any extra spaces
            cap.release()
            cv2.destroyAllWindows()
            return barcode_number  

        cv2.imshow("Barcode Scanner", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
    return None
